import {configure, shallow} from 'enzyme'
import React, { component } from 'react'
import Adapter from 'enzyme-adapter-react-16'

import Header from './components/Header'
import Link from 'react-router-dom'

configure({adapter : new Adapter()})

describe("<Header />", () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<Header />)
    })

    it('Should display 4 links when the user is authenticated', () => {
        wrapper.setProps({ isAuthenticated : true})
        expect(wrapper.find("Link")).toHaveLength(4)
    })

    it('Should display 2 links when the user is not authenticated', () => {

        expect(wrapper.find("Link")).toHaveLength(2)
    })
})