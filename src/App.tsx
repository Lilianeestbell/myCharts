import React, { Component } from 'react';
import { OverviewPieChart, ProportionPieChart } from './components/PieChart';
import PostLineChart from './components/PostLineChart';

const PostLineData = [{ "id": "Expired", "name": "Expired", "total": 22 }, { "id": "Draft", "name": "Draft", "total": 23 }, { "id": "Rejected", "name": "Rejected", "total": 14 }, { "id": "Published", "name": "Published", "total": 21 }, { "id": "Scheduled", "name": "Scheduled", "total": 1 }, { "id": "Pending", "name": "Pending", "total": 6 }];
export default class App extends Component {
    render() {
        return (
            <div>
                <PostLineChart chartData={PostLineData} />
                <OverviewPieChart total={590} />
                <ProportionPieChart total={100} oneItem={20} color="red" />
            </div>
        )
    }
}
