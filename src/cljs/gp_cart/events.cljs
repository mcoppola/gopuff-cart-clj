(ns gp-cart.events
  (:require
   [re-frame.core :refer [reg-event-db dispatch]]
   [gp-cart.db :as db]
   [ajax.core :as ajx]))


; Initial Data
(reg-event-db                   
  :process-initial-res             
  (fn [db [_ res]]
    (-> db
      (assoc :loading? false)
      (assoc :user  (-> res :user))
      (assoc :order (-> res :cart :products)))))


(reg-event-db 
 ::load-initial-data
 (fn [db _]
   (ajx/GET "https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json"
            {:handler #(dispatch [:process-initial-res %1])
             :error-handler (fn [details] (.warn js/console (str "Failed to get order.json" details)))
             :response-format :json, :keywords? true})
   (assoc db :loading? true)))

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