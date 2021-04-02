import {PageHeader} from "antd";
import React from "react";

interface IProps {
    title: string;
    subTitle: string;
}

const PageHeaderComponent = (props: IProps) => {
    const {title, subTitle} = props;

    return (
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={title}
                subTitle={subTitle}
            />
    )
};

export default PageHeaderComponent;
