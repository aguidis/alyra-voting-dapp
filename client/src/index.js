import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { Provider } from 'jotai'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import './theme/index.css'
import './theme/animation.css'

import Warning from './components/Warning'

import App from './App'
import Loading from './components/Loading'

ReactDOM.render(
    <Provider>
        <Suspense fallback={<Loading />}>
            <ErrorBoundary FallbackComponent={Warning}>
                <App />
            </ErrorBoundary>
        </Suspense>
    </Provider>,
    document.getElementById('root'),
)
