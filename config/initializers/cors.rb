Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:5173" # Allow requests from your frontend

    resource "*",
      headers: :any,
      expose: %w[access-token client uid],
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
      credentials: true
  end
end
