(ns gp-cart.data
  (:require
   [ajax.core :as ajx]))


(defn error-default [err]
  (js/console.error (str err)))

(defn get-order-data [ops]
  (ajx/GET 
   "https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json"
   {:handler (ops :handler)
    :error-handler (or (ops :error) error-default)
    :response-format :json, :keywords? true}))

(defn get-product-data [ops]
  (js/console.log (str (clojure.string/join "," (ops :products))))
  (ajx/GET 
   "https://prodcat.gopuff.com/api/products"
   {:handler (ops :handler)
     :params {
      :location_id -1
      :product_ids (str (clojure.string/join "," (ops :products)))
     }
    :error-handler (or (ops :error) error-default)
    :response-format :json, :keywords? true}))