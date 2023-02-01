use std::env;
use std::error::Error;
use std::path::PathBuf;

fn main() -> Result<(), Box<dyn Error>> {
    let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap());

    // Generate gRPC Server
    tonic_build::configure()
        .file_descriptor_set_path(out_dir.join("nodeapi_descriptor.bin"))
        .compile(&["proto/nodeapi.proto"], &["proto"])?;

    Ok(())
}
