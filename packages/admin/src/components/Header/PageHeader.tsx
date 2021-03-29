import {Button, PageHeader} from "antd";
import React from "react";

interface IProps {
    title: string;
    subTitle: string;
    onAdd: (state: boolean) => void;
}

const PageHeaderComponent = (props: IProps) => {
    const {title, subTitle, onAdd} = props;
    return (
        <>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={title}
                subTitle={subTitle}
                extra={[
                    <Button key="1" type="primary" onClick={() => onAdd(true)}>
                        Thêm
                    </Button>,
                ]}
            />
        </>


    )
}

export default PageHeaderComponent;
