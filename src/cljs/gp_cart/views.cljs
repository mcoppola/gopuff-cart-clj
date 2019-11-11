(ns gp-cart.views
  (:require
   [re-frame.core :refer [subscribe dispatch]]
   [gp-cart.subs :as subs]
   [gp-cart.components.cart :as cart]
   [gp-cart.util :as util]))


(defn ledger []
  (let [cart (subscribe [::subs/cart])
        row {:total (util/display-price (util/calc-total @cart))}]
    [:div
     {:class "gp-cart__ledger"}
     [:h3 
      (str "total: " (row :total))]]))


; Outer Layout

(defn main-panel []
  (let [loading?  (subscribe [::subs/loading?])
        user      (subscribe [::subs/user])]
    [:div 
     {:class "gp-main"}
     [:div
      {:class "gp-cart"}
      (cond 
       (not @loading?) 
       [:div
        [:div
         {:class "gp-cart__header"}
         [:h2 (str "Welcome back " (:first_name @user) " " (:last_name @user))]
         [:h1 "Your Cart"]]
        [:div (cart/items)]
        [:div (ledger)]]
       :else 
       [:h3 "Loading your cart..."])]]))


