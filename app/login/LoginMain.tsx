import React, { useState } from 'react';
import LoginFarmCreated from './LoginFarmCreated';
import LoginFarmCreating from './LoginFarmCreating';
import LoginFarmNew from './LoginFarmNew';
import LoginFarmSelect from './LoginFarmSelect';
import LoginIndex from './LoginIndex';

const LoginMain = () => {
    const [page, setPage] = useState<number>(0);
    const [newFarmName, setNewFarmName] = useState<string>('');

    const allScreen = [
        <LoginIndex setPage={setPage} />,
        <LoginFarmSelect setPage={setPage} />,
        <LoginFarmNew setPage={setPage} setNewFarmName={setNewFarmName} />,
        <LoginFarmCreating setPage={setPage} />,
        <LoginFarmCreated setPage={setPage} />,
    ];
    return (
        <>
            {allScreen[page]}
        </>
    )
}

export default LoginMain