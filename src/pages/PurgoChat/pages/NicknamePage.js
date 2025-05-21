import React from "react";
import NicknameForm from "../components/NicknameForm";
import IPhoneMockup from "../Mockup/IPhoneMockup";

const NicknamePage = () => {
    return (
        // flex justify-center items-center min-h-screen bg-gray-200 p-4"
        <div className="flex justify-center items-center  ">
            <IPhoneMockup>
                <NicknameForm />
            </IPhoneMockup>
        </div>
    );
};

export default NicknamePage;