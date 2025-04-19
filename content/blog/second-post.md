---
title: "Networking"
description: "Networking basics"
date: "2025-04-19"
slug: "networking"
---

**What is computer network? Why its useful?**

**How does internet works?**

`ping google.com`  - ping any site to check if its up and right

`traceroute [google.com](http://google.com)` - tracing the source

**OSI Model →**

- Application (HTTP/HTTPS)
- Presentation (Syntax/Security)
- Session (API, Socket)
- Transport (TCP)
- Network(Packets)
- Data Link (Ethernet)
- Physical (Router/Cable)

**For TCP/IP →**

https://takeuforward.org/computer-network/explain-tcp-model/

**IP/Subnets →** 

- IPv4 - limited but most used → solution: create subnets (same IP for different devices connected to same router)
- IPv6 - more than enough, but not much used yet

**DNS / NAT / Firewalls →**

Networks setting in AWS :

VPC (Virtual Private Cloud)

Subnets - (can be no preference)

auto-assign public-IP - enable

Firewall (security group) - can only access with SSH

security group name

![image.png](attachment:053af1ac-de54-4f33-aa78-35fb61d3ff13:image.png)

**How to set Domain Name →**

For this we need a webpage, and for that we need `nginx`

`sudo apt-get update`

`sudo apt-get install nginx` 

`cd /var/www/html` 

`systemctl status nginx` - to check if nginx server is running (at port 80)

`nslookup [google.com](http://google.com)` - to show ip

instance → security → security-group → inbound rules → edit inbound → add rule → type(custom tcp) , port(80), source type(anywhere-ipv4) → save

NAT (Network Address Translation)

![image.png](attachment:c8274f90-782c-42e0-8762-223133b2822b:image.png)

assignment : AWS VPC & VPC Peering Project for Devops & Cloud

VPC peering → connecting two VPCs

**Load Balancer →**

To distribute traffic

- application load balancer
- network load balancer
- gateway load balancer
