use crate::http_server::ServerState;
use anyhow::Error;
use axum::extract::State;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::post;
use axum::{Form, Router};
use axum_sessions::extractors::{ReadableSession, WritableSession};
use serde::Deserialize;
use std::sync::Arc;

const SESSION_EMAIL_KEY: &str = "signed_in_to";

pub(super) fn router() -> Router<Arc<ServerState>> {
    Router::new()
        .route("/register", post(register_and_login))
        .route("/login", post(login))
        .route("/logout", post(logout))
}

pub fn get_signed_in_email(session: &ReadableSession) -> Result<String, StatusCode> {
    if let Some(email) = session.get::<String>(SESSION_EMAIL_KEY) {
        Ok(email)
    } else {
        Err(StatusCode::UNAUTHORIZED)
    }
}

#[derive(Deserialize)]
struct LoginForm {
    email: String,
    password: String,
}

async fn set_logged_in(session: &mut WritableSession, email: &str) -> Result<(), Error> {
    session.insert(SESSION_EMAIL_KEY, email)?;
    Ok(())
}

fn bad_request(e: Error) -> (StatusCode, impl IntoResponse) {
    (StatusCode::BAD_REQUEST, e.to_string())
}

async fn register_and_login(
    State(state): State<Arc<ServerState>>,
    mut session: WritableSession,
    Form(input): Form<LoginForm>,
) -> Result<impl IntoResponse, (StatusCode, impl IntoResponse)> {
    state
        .user_manager
        .register(input.email.as_str(), input.password.as_str())
        .await
        .map_err(bad_request)?;

    set_logged_in(&mut session, input.email.as_str())
        .await
        .map_err(bad_request)?;

    Ok(())
}

async fn login(
    State(state): State<Arc<ServerState>>,
    mut session: WritableSession,
    Form(input): Form<LoginForm>,
) -> Result<impl IntoResponse, (StatusCode, impl IntoResponse)> {
    state
        .user_manager
        .login(input.email.as_str(), input.password.as_str())
        .await
        .map_err(bad_request)?;

    set_logged_in(&mut session, input.email.as_str())
        .await
        .map_err(bad_request)?;

    Ok(())
}

async fn logout(mut session: WritableSession) -> impl IntoResponse {
    session.destroy()
}

#[cfg(test)]
mod tests {
    use crate::http_server::test_utils::start_test_server;
    use crate::user_manager::tests::{TEST_EMAIL, TEST_PASSWORD};
    use std::collections::HashMap;

    #[tokio::test]
    async fn test_register_and_logout() {
        let (client, _) = start_test_server("/user").await;

        let mut params = HashMap::new();
        params.insert("email", TEST_EMAIL);
        params.insert("password", TEST_PASSWORD);

        client
            .post("/register")
            .form(&params)
            .send()
            .await
            .unwrap()
            .error_for_status()
            .unwrap();

        client
            .post("/logout")
            .send()
            .await
            .unwrap()
            .error_for_status()
            .unwrap();
    }

    #[tokio::test]
    async fn test_register_and_login() {
        let (client, state) = start_test_server("/user").await;
        state
            .user_manager
            .register(TEST_EMAIL, TEST_PASSWORD)
            .await
            .unwrap();

        let mut params = HashMap::new();
        params.insert("email", TEST_EMAIL);
        params.insert("password", TEST_PASSWORD);

        client
            .post("/login")
            .form(&params)
            .send()
            .await
            .unwrap()
            .error_for_status()
            .unwrap();

        client
            .post("/logout")
            .send()
            .await
            .unwrap()
            .error_for_status()
            .unwrap();
    }
}
