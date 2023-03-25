import React from 'react'
import SideNav from '../partials/SideNav/SideNav';
import ModalLoading from '../partials/ModalLoading';
import ModalComplete from '../partials/ModalComplete';

export default function Test2() {
    return (
        <div>
            <SideNav></SideNav>
            <ModalLoading></ModalLoading>
            <ModalComplete></ModalComplete>
        </div>
    )
}
