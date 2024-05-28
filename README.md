Setup kubernetes
Download lens and docker desktop
Enable kubernetes on desktop
find your kube config at ~/.kube/config on macOS/Linux or %USERPROFILE%\.kube\config on Windows
Since your cluster is not running yet you need to containerize you app so run this command on the
backend folder: docker build -t mbewd/mern-budget-backend:latest .
frontend folder: docker build -t mern-budget-frontend:latest .
Verify your images on docker desktop make sure they exist
if they exist now we are going to deploy the manifests
to do that we gonna run the command
backend folder: kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
frontend folder: kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
Ensure everything is okay with this commands
kubectl get deployments
kubectl get services
You will have pods running but the app is not yet running because the docker images are not in you docker hub so lets push the images first and then kubernetes will be able to pull them
docker push mbewd/mern-budget-backend:latest
kubectl set image deployment/mern-budget-backend backend=mbewd/mern-budget-backend:latest -n mern-budget

            docker push mbewd/mern-budget-frontend:latest
            kubectl set image deployment/mern-budget-frontend backend=mbewd/mern-budget-frontend:latest -n mern-budget

        Now you cluster should have your pods running
        URI for the database will be mongodb://localhost:30326/ to use in a graphic interface for example, otherwise is as it is in backend deployment.yaml
        you can access the apis on the backend with http://localhost:4000



Keycloak deployment

           helm install mern-budget oci://registry-1.docker.io/bitnamicharts/keycloak

           after run the commands

           # Retrieve the HTTP service port
            $HTTP_SERVICE_PORT = kubectl get --namespace default -o jsonpath="{.spec.ports[?(@.name=='http')].port}" services mern-keycloak

            # Set up port forwarding
            Start-Process -NoNewWindow -FilePath "kubectl" -ArgumentList "port-forward --namespace default svc/mern-keycloak ${HTTP_SERVICE_PORT}:${HTTP_SERVICE_PORT}"

            since we don't know the password we need to run this commands

            kubectl get secrets -n <namespace>(normally "default")

            kubectl get secret <secret-name> -n <namespace> -o yaml
            (in this case would be "kubectl get secret mern-keycloak -o yaml")

            find the data: admin-password: "whatever value is here copy it"

            then witht he value we need to decode it

            for example

            echo b1h5VVI1QjRaVQ== | base64 --decode
            would give us the password
            so to enter keycloak would be username: user and password: oXyUR5B4ZU
