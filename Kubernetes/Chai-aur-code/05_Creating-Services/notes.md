## Service Notes

<p align="center">
  <img src="Services-Image-Notes/pods-getting-ip-assigned.jpeg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/Service Setup.jpeg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/ingress-setup.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/ingress-service-setup.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/service-communication-via-port.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/service-endpoints.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/multi-port-services.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/headless-svc-1.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/headless-svc-2.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/headless-svc-3.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/nodeport-svc-1.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/nodeport-svc-2.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/loadbalancer-svc-1.jpg" width="600"/>
</p>

---

<p align="center">
  <img src="Services-Image-Notes/loadbalancer-svc-2.jpg" width="600"/>
</p>

Service IP is associated with every service(except for Headless service and external service). We call it clusterIP. 
Nodeport service madhe pn clusterip (service IP) asto, if you observe in the above image. 
Loadbalancer service madhe pn clusterip as well as external ip asto(cloud providers create a load balancer for it for external access) 
Headless service & extername service madhe clusterip nasto 

---

<p align="center">
  <img src="Services-Image-Notes/wrap-up.jpg" width="600"/>
</p>