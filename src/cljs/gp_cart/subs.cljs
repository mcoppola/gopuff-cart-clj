(ns gp-cart.subs
  (:require
   [re-frame.core :as re-frame]))


(re-frame/reg-sub
 ::cart
 (fn [db]
   (:cart db)))

(re-frame/reg-sub
 ::loading?
 (fn [db]
   (:loading? db)))

(re-frame/reg-sub
 ::user
 (fn [db]
   (:user db)))
