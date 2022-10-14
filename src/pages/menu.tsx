import {Card, Grid} from "antd-mobile";
import React from "react";
import {history} from "umi";

export default function MenuPage() {
    return (
        <div style={{padding: '16px 8px'}}>
            <Grid columns={1} gap={8}>
                <Grid.Item>
                    <MenuCard name="比赛计分" path="/score"/>
                </Grid.Item>
                <Grid.Item>
                    <MenuCard name="努力开发中..."/>
                </Grid.Item>
                <Grid.Item>
                    <MenuCard name="努力开发中..."/>
                </Grid.Item>
                <Grid.Item>
                    <MenuCard name="努力开发中..."/>
                </Grid.Item>
                <Grid.Item>
                    <MenuCard name="努力开发中..."/>
                </Grid.Item>
            </Grid>
        </div>
    );
}

type MenuCardProps = {
    name: string;
    path?: string;
}

const MenuCard = (props: MenuCardProps) => {
    const {name, path} = props;

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (path) {
            history.push(path);
        }
    }

    return <Card onClick={onClick}>
        <div style={{
            padding: '1em 0.5em',
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold"
        }}>{name}</div>
    </Card>
}