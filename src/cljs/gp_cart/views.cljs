(ns gp-cart.views
  (:require
   [re-frame.core :refer [subscribe dispatch]]
   [gp-cart.subs :as subs]
   [gp-cart.events :as events]))


(defn cart-item [product] 
   [:div 
    {:class "cf w5"}
    [:span {:class "fl"} (str (product :id))]
    [:span {:class "fr"} (str "$" (product :price))] ])

(defn cart []
   (let [order (subscribe [::subs/order])
         user  (subscribe [::subs/user])]
   [:div
     [:h2 (str "Welcome back " ( :first_name @user) " " (:last_name @user))]
  
     [:h4 "your cart products:"]
     [:div 
      (for [product @order]
           (cart-item product))]
  
     [:button 
      {:on-click #(dispatch [::events/get-order])}
       "reload cart"]]))


(defn main-panel []
   (let [items     (subscribe [::subs/items])
         name      (subscribe [::subs/name])
         loading?  (subscribe [::subs/loading?])]

      [:div
       {:class "mw7 center mt5 avenir"}
       [:h1 @name]
       [:input      
        {:value @name
         :on-change  #(dispatch [::events/change-name (-> % .-target .-value)])}]
        ; :on-change  (fn [evt] (dispatch [::events/change-name (.-value (.-target evt))]))}]
        ; :on-change  (fn [evt] (dispatch [::events/change-name (-> evt .-target .-value)]))}]

       [:button 
        {:on-click #(dispatch [::events/cart-add {:title @name}])}
         "add item"]

       
       [:h3 "todo list:"]
       [:div
         (for [item @items] 
          [:div 
           {:on-click #(js/console.log %)}
           (item :title)])]

        (cond 
         (not @loading?) (cart)
         :else [:h3 "Loading your cart..."])

      ]))