use std::net::{IpAddr, Ipv4Addr, SocketAddr};

use axum::{extract::Query, http::StatusCode, routing::get, Json, Router, Server};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use tower_http::cors::{Any, CorsLayer};

const PORT: u16 = 3000;

#[tokio::main]
async fn main() {
    let cors_layer = CorsLayer::new().allow_origin(Any);
    let router = Router::new()
        .route("/api/greeting", get(greeting_handler))
        .layer(cors_layer);

    let addr = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)), PORT);

    let server = Server::bind(&addr).serve(router.into_make_service());

    println!("Listening on {}", addr);

    if let Err(reason) = server.await {
        eprintln!("{}", reason);
    }
}

#[derive(Deserialize)]
struct GreetingQueryParams {
    name: String,
}

#[derive(Serialize)]
struct GreetingResponse {
    message: String,
}

async fn greeting_handler(Query(query): Query<GreetingQueryParams>) -> (StatusCode, Json<Value>) {
    let message = GreetingResponse {
        message: format!("Hello! {}, from Axum", query.name),
    };
    (StatusCode::OK, json!(message).into()).into()
}
