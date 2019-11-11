(ns gp-cart.util
  (:require
   [goog.string :as gstring]
   [goog.string.format]))



; Helpers

(defn product-cost [product]
  (* (product :price) (product :quantity)))

(defn display-price [n] 
  (str "$" (gstring/format "%.2f" n)))

(defn calc-total [cart]
  (reduce #(+ %1 (product-cost %2)) 0 cart))
