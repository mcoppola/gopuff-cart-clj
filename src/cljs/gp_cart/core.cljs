(ns gp-cart.core
  (:require
   [reagent.core :as reagent]
   [re-frame.core :as re-frame]
   [gp-cart.events :as events]
   [gp-cart.views :as views]
   [gp-cart.config :as config]))


(defn dev-setup []
  (when config/debug?
    (enable-console-print!)
    (println "dev mode")))

(defn mount-root []
  (re-frame/clear-subscription-cache!)
  (reagent/render [views/main-panel]
                  (.getElementById js/document "app")))

(defn ^:export init []
  (re-frame/dispatch-sync [::events/initialize-db])
  (re-frame/dispatch-sync [::events/load-initial-data])
  (dev-setup)
  (mount-root))
