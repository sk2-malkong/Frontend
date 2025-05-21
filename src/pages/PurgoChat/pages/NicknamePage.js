import React from "react";
import NicknameForm from "../components/NicknameForm";
import IPhoneMockup from "../Mockup/IPhoneMockup";

const NicknamePage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4" style={{background : "#c2dfff"}}>
            <IPhoneMockup>
                <NicknameForm />
            </IPhoneMockup>
        </div>
    );
};

export default NicknamePage;