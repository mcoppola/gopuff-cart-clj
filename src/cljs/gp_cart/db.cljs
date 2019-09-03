(ns gp-cart.db)

(def default-db
  {:name "churdumplin"
   :cart 
    {:items [
      {:title "my first product"}
      {:title "my second product"}
     ]
    }
   :order [{:id 123}]
  })
