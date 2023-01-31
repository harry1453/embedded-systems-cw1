import sys
sys.path.append('.')
from routing.bin_grid import *
from random import uniform

def get_instances_1():
    nodes = []
    links = []
    node1 = Node(0,1,1)
    nodes.append(node1)
    node2 = Node(0,2,1)
    nodes.append(node2)
    node3 = Node(0,3,1)
    nodes.append(node3)
    node4 = Node(0,4,1)
    nodes.append(node4)
    node5 = Node(0,5,1)
    nodes.append(node5)
    node6 = Node(0,6,1)
    nodes.append(node6)
    link12 = Link((node1, node2), 10)
    links.append(link12)
    link13 = Link((node1, node3),15 )
    links.append(link13)
    link14 = Link( (node1, node4),9)
    links.append(link14)
    link15 = Link((node1, node5),5)
    links.append(link15)
    link23 = Link((node2, node3),17)
    links.append(link23)
    link24 = Link((node2, node4),10)
    links.append(link24)
    link25 = Link((node2, node5),11 )
    links.append(link25)
    link34 = Link((node3, node4),1)
    links.append(link34)
    link35 = Link((node3, node5),4)
    links.append(link35)
    link45 = Link((node4, node5),20)
    links.append(link45)
    link16 = Link((node1, node6),21)
    links.append(link16)
    link26 = Link((node2, node6), 15)
    links.append(link26)
    link36 = Link((node3, node6), 13)
    links.append(link36)
    link46 = Link((node4, node6),2)
    links.append(link46)
    link56 = Link((node5, node6),25)
    links.append(link56)
    return (links, nodes)


def get_random_instances(n): 
    n_nodes = n*2
    links = []
    nodes = []
    for i in range(n_nodes):
        x = uniform(0.0, 50.0)
        y = uniform(0.0, 50.0)
        node1 = Node(x, y, 1, i)
        for node2 in nodes:
            link = Link((node1, node2))
            links.append(link)
        nodes.append(node1)
    return (links, nodes)

def get_instances_2():
    nodes = []
    links = []
    node1 = Node(0,1,1)
    nodes.append(node1)
    node2 = Node(0,2,1)
    nodes.append(node2)
    node3 = Node(0,3,1)
    nodes.append(node3)
    node4 = Node(0,4,1)
    nodes.append(node4)
    node5 = Node(0,5,1)
    nodes.append(node5)
    link12 = Link((node1, node2), 3)
    links.append(link12)
    link13 = Link((node1, node3),1)
    links.append(link13)
    link14 = Link( (node1, node4),8)
    links.append(link14)
    link15 = Link((node1, node5),9)
    links.append(link15)
    link23 = Link((node2, node3),5)
    links.append(link23)
    link24 = Link((node2, node4),7)
    links.append(link24)
    link25 = Link((node2, node5),6)
    links.append(link25)
    link34 = Link((node3, node4),1)
    links.append(link34)
    link35 = Link((node3, node5),2)
    links.append(link35)
    link45 = Link((node4, node5),3)
    links.append(link45)
    return (links, nodes)

def get_instances_3(): 
    nodes = []
    links = []
    node1 = Node(1, 0, 1)
    nodes.append(node1)
    node2 = Node(2, 0, 1)
    nodes.append(node2)
    node3 = Node(3, 0, 1)
    nodes.append(node3)
    node4 = Node(4, 0, 1)
    nodes.append(node4)
    node5 = Node(5, 0, 1)
    nodes.append(node5)
    link12 = Link((node1, node2), 3)
    link13 = Link((node1, node2), 3)
    link12 = Link((node1, node2), 3)
    link12 = Link((node1, node2), 3)
    link12 = Link((node1, node2), 3)
    link12 = Link((node1, node2), 3)
    link12 = Link((node1, node2), 3)
    return links