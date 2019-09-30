(ns gp-cart.views
  (:require
   [re-frame.core :refer [subscribe dispatch]]
   [gp-cart.subs :as subs]
   [gp-cart.events :as events]
   [goog.string :as gstring]
   [goog.string.format]))


; Helpers

(defn product-cost [product]
  (* (product :price) (product :quantity)))

(defn calc-total [cart]
  (reduce #(+ %1 (product-cost %2)) 0 cart))

(defn display-price [n] 
  (str "$" (gstring/format "%.2f" n)))

; Components

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

(defn cart-item [product] 
  [:div 
   {:class "cf w5 mb3 hide-child"}
   [:img  {:class "fl" :src (-> product :images first :thumb) :width 120}]
   (add-btn product)
   (remove-btn product)
   [:span {:class "fr mr2 br-100 tc pa1 w1 h1 bg-light-purple white"} (str (product :quantity))]
   [:span {:class "fr mr2 mt2"} (display-price (product-cost product))]])


  (defn cart []
    (let [cart  (subscribe [::subs/cart])]
      [:div
       [:div
        (map cart-item @cart)]
       [:button 
        {:on-click #(dispatch [::events/get-order])}
        "reload cart"]]))



  (defn ledger []
    (let [cart (subscribe [::subs/cart])
          row {:total (display-price (calc-total @cart))}]
      [:h3 
       {:class "mt0 fixed"}
       (str "total: " (row :total))]))


  (defn main-panel []
    (let [loading?  (subscribe [::subs/loading?])
          user      (subscribe [::subs/user])]
      [:div
       {:class "mw7 center mt5 avenir"}
       (cond 
        (not @loading?) [:div {:class "cf"} 
                         [:h2 (str "Welcome back " (:first_name @user) " " (:last_name @user))]
                         [:h1 "Your Cart"]
                         [:div {:class "fl w-50"} (cart)]
                         [:div {:class "fl w-50"} (ledger)]]
        :else [:h3 "Loading your cart..."])]))