import { Location } from 'history'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

const useBrowserBackStack = () => {
    const history = useHistory()
    const [backStack, setBackStack] = useState<Location[]>([])
    useEffect(() => {
        history.listen((location, action) => {
            setBackStack(backStack => {
                switch (action) {
                    case 'POP':
                        return backStack.slice(0, backStack.length - 1)
                    case 'PUSH':
                        return [...backStack, location]
                    case 'REPLACE':
                        return [...backStack.slice(0, backStack.length - 1), location]
                }
            })
        })
    }, [setBackStack, history])
    return backStack
}

export default useBrowserBackStack