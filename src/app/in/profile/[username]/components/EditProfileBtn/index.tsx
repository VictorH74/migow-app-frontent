"use client"
import LoadingLazyComponent from "@/components/LoadingLazyComponent";
import React from "react";

const EditProfileModal = React.lazy(() => import("../EditProfileModal"))

export default function EditProfileBtn() {
    const [showEditProfileModal, setShowEditProfileModal] = React.useState(false)

    return (
        <>
            <button className='py-2 px-4 rounded-2xl bg-gray-500 text-white' onClick={() => setShowEditProfileModal(true)} >
                Edit profile
            </button>
            <React.Suspense fallback={<LoadingLazyComponent />}>
                {showEditProfileModal && (<EditProfileModal onClose={() => setShowEditProfileModal(false)} />)}
            </React.Suspense>
        </>

    )
}