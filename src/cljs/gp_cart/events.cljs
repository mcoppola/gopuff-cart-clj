(ns gp-cart.events
  (:require
   [re-frame.core :refer [reg-event-db dispatch]]
   [gp-cart.db :as db]
   [gp-cart.data :as data]
   [clojure.set :as set]
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


; Handle Order Response
(reg-event-db                   
 :process-order-res             
 (fn [db [_ res]]
   (-> db
     (assoc :loading? false)
     (assoc :user  (-> res :user))
     (assoc :cart (-> res :cart :products)))))


; Fetch Products
(reg-event-db 
 :get-products
 (fn [db [_ products]]
   (data/get-product-data
    {:products products
     :handler #(dispatch [:process-product-res %1])})
   (assoc db :loading? true)))


; Handle Products Response
(reg-event-db                   
 :process-product-res             
 (fn [db [_ res]]
   (let  [joined (concat 
                  (db :cart) 
                  (map #(dissoc % :quantity :amount) (res :products)))]
     (-> db 
       (assoc :loading? false )
       (assoc :cart (map #(apply merge %) 
                         (vals (group-by :product_id joined))))))))

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
   (update-in db [:cart :items] concat [item])))