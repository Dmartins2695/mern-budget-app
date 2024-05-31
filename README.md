# Project Setup Guide

## Kubernetes Setup

1. **Download Tools:**

   - Install Lens and Docker Desktop.

2. **Enable Kubernetes:**

   - Enable Kubernetes on Docker Desktop.
   - _Tip:_ Find your kube config at `~/.kube/config` on macOS/Linux or `%USERPROFILE%\.kube\config` on Windows.

3. **Containerize Your App:**

   - Navigate to the backend folder and run:
     ```bash
     docker build -t mbewd/mern-budget-backend:latest .
     ```
   - Navigate to the frontend folder and run:
     ```bash
     docker build -t mern-budget-frontend:latest .
     ```

4. **Deploy Manifests:**

   - Check if your Docker images exist on Docker Desktop.
   - If they exist, deploy the manifests:
     - Backend:
       ```bash
       kubectl apply -f backend-deployment.yaml
       kubectl apply -f backend-service.yaml
       kubectl apply -f mongo-deployment.yaml
       kubectl apply -f mongo-service.yaml
       ```
     - Frontend:
       ```bash
       kubectl apply -f frontend-deployment.yaml
       kubectl apply -f frontend-service.yaml
       ```

5. **Verify Deployment:**

   - Check deployments and services:
     ```bash
     kubectl get deployments
     kubectl get services
     ```

6. **Push Docker Images:**

   - Push your Docker images to Docker Hub:
     ```bash
     docker push mbewd/mern-budget-backend:latest
     kubectl set image deployment/mern-budget-backend backend=mbewd/mern-budget-backend:latest -n mern-budget
     docker push mbewd/mern-budget-frontend:latest
     kubectl set image deployment/mern-budget-frontend backend=mbewd/mern-budget-frontend:latest -n mern-budget
     ```

7. **Finalize Deployment:**
   - Ensure your pods are running, and access the backend APIs at `http://localhost:4000`.
   - Database URI: `mongodb://localhost:30326/` (in this case).

# Keycloak Deployment

1. **Deploy Keycloak:**

   - Execute the following command to deploy Keycloak:
     ```bash
     helm install mern-budget oci://registry-1.docker.io/bitnamicharts/keycloak
     ```

2. **Setup Port Forwarding:**

   - After deploying Keycloak, configure port forwarding for local access:
     - Retrieve the HTTP service port:
       ```bash
       HTTP_SERVICE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[?(@.name=='http')].port}" services mern-keycloak)
       ```
     - Start port forwarding:
       ```bash
       kubectl port-forward --namespace default svc/mern-keycloak ${HTTP_SERVICE_PORT}:${HTTP_SERVICE_PORT}
       ```

3. **Retrieve Admin Password:**

   - Since the admin password is initially unknown, follow these steps to retrieve it:
     - List secrets in the namespace:
       ```bash
       kubectl get secrets -n <namespace>
       ```
     - Get the secret details in YAML format:
       ```bash
       kubectl get secret <secret-name> -n <namespace> -o yaml
       ```
     - _Tip:_ In this case, use `kubectl get secret mern-keycloak -o yaml`.

4. **Decode Admin Password:**
   - Locate the `admin-password` field in the secret output.
   - Decode the password value using the following command:
     ```bash
     echo "b1h5VVI1QjRaVQ==" | base64 --decode
     ```

After retrieving and decoding the admin password, you can access Keycloak using the username `user` and the decoded password.
