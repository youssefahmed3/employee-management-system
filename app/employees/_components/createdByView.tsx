"use client"
import { getUserById } from '@/lib/actions/user.action';
import { UserType } from '@/lib/models/user.model';
import React, { useEffect, useState } from 'react';


interface viewProps {
    createdBy: string;
}

function CreatedByView(props: viewProps) {
    const [user, setUser] = useState<UserType | null>()
    useEffect(() => {
        async function userInfo() {
            const user = await getUserById(props.createdBy as string)
            setUser(user)
        }

        userInfo()
    },)
    return (
        <div>
            {user?.username}
        </div>
    );
}

export default CreatedByView;