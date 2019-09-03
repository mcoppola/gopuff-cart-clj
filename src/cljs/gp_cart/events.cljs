(ns gp-cart.events
  (:require
   [re-frame.core :refer [reg-event-db dispatch]]
   [gp-cart.db :as db]
   [gp-cart.data :as data]
   [ajax.core :as ajx]))




; Fetch Order
(reg-event-db 
 ::get-order
 (fn [db _]
   (data/get-order-data
    {:handler 
     #(do
       (dispatch [:process-order-res %])
       (dispatch [:get-products (map :id (-> % :cart :products))]))})
   (assoc db :loading? true)))

(reg-event-db                   
  :process-order-res             
  (fn [db [_ res]]
    (-> db
      (assoc :loading? false)
      (assoc :user  (-> res :user))
      (assoc :order (-> res :cart :products)))))

; Products
(reg-event-db 
 :get-products
 (fn [db [_ products]]
   (js/console.log (str "get-products" products))
   (data/get-product-data
    {:products products
     :handler #(dispatch [:process-product-res %1])})
   (assoc db :loading? true)))

(reg-event-db                   
  :process-product-res             
  (fn [db [_ res]]
    (js/console.log "prodcess-product-res")
    (-> db
      (assoc :loading? false)
      ; (assoc :cart (clojure.set/join (db :cart) (res :products)))
      ; (assoc :order (-> res :cart :products)))
      )))

(reg-event-db
 ::initialize-db
 (fn [_ _]
   db/default-db))

(reg-event-db
 ::change-name
 (fn [db [_ new-name]]
  (assoc-in db [:name] new-name)))

(reg-event-db
  ::cart-add
  (fn [db [_ item]]
    (println "cart add" item)
    (update-in db [:cart :items] concat [item])))