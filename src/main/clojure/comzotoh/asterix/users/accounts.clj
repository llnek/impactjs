
(ns  ^{ :doc ""
        :author "kenl" }

  comzotoh.asterix.users.accounts )


(import '( com.zotoh.wflow
  If FlowPoint Activity Pipeline PipelineDelegate PTask Work))
(import '(com.zotoh.gallifrey.io HTTPEvent HTTPResult))
(import '(com.zotoh.wflow.core Job))

(use '[clojure.tools.logging :only (info warn error debug)])
(use '[comzotohcljc.tardis.core.wfs])
(use '[comzotohcljc.tardis.auth.core :only [maybeSignupTest
                                            maybeLoginTest] ])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn- doSignupFail "" ^PTask []
  (DefWFTask
    (perform [_ fw job arg]
      (let [ ^HTTPEvent evt (.event job)
             ^HTTPResult res (.getResultObj evt) ]
        (.setStatus res 500)
        (.replyResult evt)))))

(defn- doSignupOK "" ^PTask []
  (DefWFTask
    (perform [_ fw job arg]
      (let [ ^HTTPEvent evt (.event job)
             ^HTTPResult res (.getResultObj evt) ]
        (.setStatus res 200)
        (.setContent res "You're signed up!!")
        (.setHeader res "content-type" "text/plain")
        (.replyResult evt)))))

(deftype SignupHandler [] PipelineDelegate
  (getStartActivity [_  pipe]
    (require 'comzotoh.asterix.users.accounts)
    (debug "signup pipe-line - called.")
    (If. (maybeSignupTest) (doSignupOK) (doSignupFail)))

  (onStop [_ pipe]
    (info "nothing to be done here, just stop please."))

  (onError [ _ err curPt]
    (info "Oops, I got an error!")))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn- doLoginFail "" ^PTask []
  (DefWFTask
    (perform [_ fw job arg]
      (let [ ^HTTPEvent evt (.event job)
             ^HTTPResult res (.getResultObj evt) ]
        (.setStatus res 500)
        (.replyResult evt)))))

(defn- doLoginOK "" ^PTask []
  (DefWFTask
    (perform [_ fw job arg]
      (let [ ^HTTPEvent evt (.event job)
             ^comzotohcljc.tardis.io.ios.WebSession
             mvs (.getSession evt)
             ^HTTPResult res (.getResultObj evt) ]
        (.setStatus res 200)
        (.setContent res "You're logged-in !!!")
        (.setHeader res "content-type" "text/plain")
        (.replyResult evt)))))

(deftype LoginHandler [] PipelineDelegate
  (getStartActivity [_  pipe]
    (require 'comzotoh.asterix.users.accounts)
    (debug "login pipe-line - called.")
    (If. (maybeLoginTest) (doLoginOK) (doLoginFail)))

  (onStop [_ pipe]
    (info "nothing to be done here, just stop please."))

  (onError [ _ err curPt]
    (info "Oops, I got an error!")))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


(def ^:private pipe-eof nil)




