import {Button, PageHeader} from "antd";
import React from "react";
import {useLocation} from "react-router-dom";

interface IProps {
    title: string;
    subTitle: string;
    onAdd: (state: boolean) => void;
}

const PageHeaderComponent = (props: IProps) => {
    const {title, subTitle, onAdd} = props;
    const location = useLocation();

    return (
        <>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={title}
                subTitle={subTitle}
                extra={location.pathname.match('(\\/[skills])\\w+') ? [
                    <Button key="1" type="primary" onClick={() => onAdd(true)}>
                        Thêm
                    </Button>,
                ] : []}
            />
        </>
    )
};

export default PageHeaderComponent;
