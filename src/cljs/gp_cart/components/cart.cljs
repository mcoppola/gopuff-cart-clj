(ns gp-cart.components.cart
  (:require
   [re-frame.core :refer [subscribe dispatch]]
   [gp-cart.subs :as subs]
   [gp-cart.events :as events]
   [gp-cart.util :as util]))


; Atoms

(defn add-btn [product]
  [:span 
   {:class "fr f6 link grow br-100 tc pa2 w1 h1 white bg-green pointer child"
    :on-click #(dispatch [::events/cart-transact 1 (product :id)])}
   "+"])

(defn remove-btn [product]
  [:span 
   {:class "fr f6 link grow br-100 tc pa2 w1 h1 black bg-light-gray pointer child"
    :on-click #(dispatch [::events/cart-transact -1 (product :id)])}
   "-"]) 


; Components

(defn item [product] 
  [:div 
   {:class "gp-cart__item cf w5 mb3 hide-child"}
   [:img  {:class "fl" :src (-> product :images first :thumb) :width 80}]
   (add-btn product)
   (remove-btn product)
   [:span {:class "fr mr2 br-100 tc pa1 w1 h1 bg-blue white"} (str (product :quantity))]
   [:span {:class "fr mr2 mt2"} (util/display-price (util/product-cost product))]])


(defn item-expanded [product] 
  [:div 
   {:class "gp-cart__item cf w5 mb3 hide-child"}
   [:img  {:class "fl" :src (-> product :images first :thumb) :width 80}]
   (add-btn product)
   (remove-btn product)
   [:span {:class "fr mr2 br-100 tc pa1 w1 h1 bg-blue white"} (str (product :quantity))]
   [:span {:class "fr mr2 mt2"} (util/display-price (util/product-cost product))]])

(defn items []
  (let [cart (subscribe [::subs/cart])
        view (subscribe [::subs/view])]
    [:div 
     {:class "gp-cart__items"}
     [:div
      (map 
       (if (@view :show-details?) item-expanded item) @cart)]
     [:button 
      {:on-click #(dispatch [::events/get-order])}
      "reload cart"]]))
