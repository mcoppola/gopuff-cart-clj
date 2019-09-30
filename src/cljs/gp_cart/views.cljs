(ns gp-cart.views
  (:require
   [re-frame.core :refer [subscribe dispatch]]
   [gp-cart.subs :as subs]
   [gp-cart.events :as events]))


(defn cart-item [product] 
  [:div 
   {:class "cf w5 mb3 hide-child"}
   [:img  {:class "fl" :src (-> product :images first :thumb) :width 80}]
   
   [:span {:class "fr f6 link grow br-100 tc pa1 w1 h1 white bg-green pointer child"} "+"]
   [:span {:class "fr f6 link grow br-100 tc pa1 w1 h1 white bg-gray pointer child"} "-"]
   [:span {:class "fr mr2 br-100 tc pa1 w1 h1 bg-light-purple white"} (str (product :quantity))]
   [:span {:class "fr mr2"} (str "$" (* (product :price) (product :quantity)))]])


(defn cart []
  (let [cart  (subscribe [::subs/cart])
        user  (subscribe [::subs/user])]
    [:div
     [:h2 (str "Welcome back " ( :first_name @user) " " (:last_name @user))]
     
     [:h4 "Your Cart"]
     [:div 
      (for [product @cart]
        (cart-item product))]
     
     [:button 
      {:on-click #(dispatch [::events/get-order])}
      "reload cart"]]))




(defn main-panel []
  (let [loading?  (subscribe [::subs/loading?])]

    [:div
     {:class "mw7 center mt5 avenir"}
     (cond 
      (not @loading?) (cart)
      :else [:h3 "Loading your cart..."])]))