import { getUserProfile } from '@/app/api/services/profile/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import keycloak from '../../../config/keycloak';
import { useBackgroundContext } from '@/contextApi/darkModeState';

interface ProfileDashProps {
    token: string;
}

function ProfileDash({ token }: ProfileDashProps) {
    const { status } = useBackgroundContext();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['email'],
        queryFn: () => getUserProfile(token),
    });

    // Redirect to Keycloak account pages
    const goToKeycloakAccount = (action?: string) => {
        const url = action
            ? `${keycloak.createAccountUrl()}&action=${action}`
            : keycloak.createAccountUrl();
        window.open(url, '_blank');
    };

    if (isLoading) {
        return (
            <div className="mt-32 flex justify-center items-center h-full">
                <p className="text-lg text-gray-600">Loading profile...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-32 flex justify-center items-center h-full">
                <p className="text-lg text-red-500">Error loading profile: {(error as Error).message}</p>
            </div>
        );
    }

    return (
        <div className=" mx-auto w-full max-w-6xl px-6 py-8 bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl flex flex-col md:flex-row gap-6">
            {/* Profile Info */}
            <div className="flex-1 p-6 bg-white/20 rounded-xl shadow-inner">
                <h1 className={`text-3xl font-bold text-center mb-6 ${status ? "text-white" : "text-black"}`}>Profile Information</h1>
                <div className="space-y-4 text-white text-lg">
                    <div className="flex justify-between">
                        <span className={`font-medium ${status ? "text-gray-300" : "text-gray-700"}`}>Email:</span>
                        <span className={`font-medium ${status ? "text-gray-300" : "text-gray-700"}`}>{data?.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className={`font-medium ${status ? "text-gray-300" : "text-gray-700"}`}>First Name:</span>
                        <span className={`font-medium ${status ? "text-gray-300" : "text-gray-700"}`}>{data?.firstName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className={`font-medium ${status ? "text-gray-300" : "text-gray-700"}`}>Last Name:</span>
                        <span className={`font-medium ${status ? "text-gray-300" : "text-gray-700"}`}>{data?.lastName || 'N/A'}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex-1 p-6 bg-white/20 rounded-xl shadow-inner">
                <h1 className={`text-3xl font-bold text-center mb-6 ${status ? "text-white" : "text-black"}`}>Actions</h1>
                <div className="flex flex-col space-y-4 items-center">
                    <button
                        className={`w-full font-medium py-2 rounded-lg transition duration-300 ${status ? "text-white bg-blue-600 hover:bg-blue-700" : "text-gray-700 bg-blue-200 hover:bg-blue-400"}`}
                        onClick={() => goToKeycloakAccount('profile')}
                    >
                        Edit Profile
                    </button>
                    <button
                        className={`w-full font-medium py-2 rounded-lg transition duration-300 ${status ? "text-white bg-green-600 hover:bg-green-700" : "text-gray-700 bg-green-200 hover:bg-green-400"}`}
                        onClick={() => goToKeycloakAccount('password')}
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileDash;
