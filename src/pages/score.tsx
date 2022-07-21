import React, { useEffect, useState } from "react";
import {Button, CapsuleTabs, Card, Dialog, Space, Tag} from "antd-mobile";
import {ExclamationCircleFill, FrownFill, LeftOutline, SmileFill} from "antd-mobile-icons";

const confirm= (msg: string | boolean, ok?: (isConfirm?: boolean) => void, cancel?: () => void) => {// 确认框
    if (false === msg) {
        if (typeof ok === 'function') {
            ok(false);
        }
        return null;
    } else {
        return Dialog.confirm({
            header: <ExclamationCircleFill
                style={{
                    fontSize: 64,
                    color: 'var(--adm-color-warning)',
                }}
            />,
            title: msg,
            onConfirm: ok,
            onCancel: cancel,
        });
    }
}

type scoresItem = {
    num: number;
    score: number;
    isTop?: boolean;
}

//记分统计
export default () => {

    const [contestantCount, setContestantCount] = useState<number>(2);
    const [scores, setScores] = useState<scoresItem[]>([]);

    const start = () => {
        const scores2: scoresItem[] = [];
        for (let i = 0; i < contestantCount; i++) {
            scores2.push({ num: 1 + i, score: 0 });
        }
        setScores(scores2);
    }

    const plus = (index: number, offest: number) => {
        const currScore = scores[index].score;
        if (offest < 0 && currScore <= 0) {
            return;
        }
        const scores2: scoresItem[] = [...scores];
        scores2[index].score = currScore + offest;

        scores2.sort((a, b) => { return b.score - a.score });

        const topScore: number = scores2[0].score;

        for (const item of scores2) {
            if (item.score > 0 && item.score == topScore) {
                item.isTop = true;
            } else {
                item.isTop = false;
            }
        }

        scores2.sort((a, b) => { return a.num - b.num });

        setScores(scores2);
    }

    return (
        <div style={{ padding: 12 }}>
            {(!scores || scores.length == 0) ? <Space direction="vertical" block style={{ '--gap': '24px' }}>
                <CapsuleTabs activeKey={'' + contestantCount} onChange={(key: string) => { setContestantCount(Number(key)) }}>
                    <CapsuleTabs.Tab title='1人' key='1' />
                    <CapsuleTabs.Tab title='2人' key='2' />
                    <CapsuleTabs.Tab title='3人' key='3' />
                    <CapsuleTabs.Tab title='4人' key='4' />
                </CapsuleTabs>
                <Button block color='primary' size='large' onClick={start}>开始计分</Button>
            </Space> : <Space direction="vertical" block style={{ '--gap': '12px' }}>
                <Space block style={{ justifyContent: 'space-between' }}>
                    <Button size='large' onClick={() => {
                        confirm('确定返回吗？', () => {
                            setScores([]);
                        })
                    }}><Space><LeftOutline /><span>返回</span></Space></Button>
                    <Button size='large' color="danger" onClick={() => {
                        confirm('确定全部清零吗？', () => {
                            start();
                        })
                    }}>重新计分</Button>
                </Space>
                <Space direction="vertical" block style={{ '--gap': '12px' }}>
                    {scores.map((item, index) => <ScoreCount key={index} num={item.num} score={item.score} isTop={item.isTop} onPlus={(offest) => plus(index, offest)} />)}
                </Space>
            </Space>}
        </div>
    );
}

type ScoreCountProps = {
    num: number;
    score: number;
    isTop?: boolean;
    onPlus?: (offest: number) => void;
}

const ScoreCount = (props: ScoreCountProps) => {
    const { num, score, isTop, onPlus } = props;

    const plus = (offest: number) => {
        onPlus?.(offest);
    }

    return (<Card className="shadow"
        title={<Space block style={{ alignItems: 'center' }}>
            <Tag color='primary' style={{ fontSize: '1.2em' }}># {num}</Tag>
            {isTop == true ? <SmileFill fontSize={32} color='var(--adm-color-warning)' /> : <FrownFill fontSize={32} color='var(--adm-color-weak)' />}
        </Space>}
        headerStyle={{ justifyContent: 'center' }}
        bodyStyle={{ padding: 4 }}>
        <Space block style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Space direction="vertical">
                <Button size='large' color="success" style={{ fontSize: '2em' }} onClick={() => plus(1)}>+ 1</Button>
                {/* <Button size='large' color="success" onClick={() => plus(2)}>+ 2</Button>
                    <Button size='large' color="success" onClick={() => plus(3)}>+ 3</Button> */}
            </Space>
            <div style={{ fontSize: '6em' }}>{score}</div>
            <Space direction="vertical">
                {/* <Button size='large' color="success" onClick={() => plus(4)}>+ 4</Button>
                    <Button size='large' color="success" onClick={() => plus(5)}>+ 5</Button> */}
                <Button size='large' color="warning" style={{ fontSize: '2em' }} onClick={() => plus(-1)}>- 1</Button>
            </Space>
        </Space>
    </Card>)
}
