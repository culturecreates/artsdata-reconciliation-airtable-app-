import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ArtsdataReconciliationApp } from "./ReconciliationApp";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

function TabComponent() {


    const [tabs, setTabs] = useState([
        { id: uuidv4(), name: "Tab 1", content: <ArtsdataReconciliationApp /> }
    ])
    const [key, setKey] = useState(tabs[0].id);
    const [editableTab, setEditableTab] = useState(null);

    function handleDoubleClick(key) {
        setEditableTab(key);
    };

    function handleEditTabName(tabName) {
        if (!!tabName?.trim()) {
            const isTabNameExist = tabs.find(tab => tab.name === tabName?.trim());
            const updatedTabs = tabs.map(tab => {
                if (editableTab === tab.id && !isTabNameExist) {
                    tab.name = tabName;
                    return tab;
                }
                return tab;
            });
            setTabs(updatedTabs);
        }
        setEditableTab(null);
    };

    function createTabs() {
        const allTabs = tabs.map(tab => {
            if (editableTab === tab.id) {
                return (
                    <Tab key={tab.id}
                        eventKey={tab.id}
                        title={<input type="text" name="name" placeholder={tab.name} onBlur={e => handleEditTabName(e.target.value)} />}>
                        {tab.content}
                    </Tab>)
            }
            return (
                <Tab key={tab.id} eventKey={tab.id} title={tab.name} >
                    {tab.content}
                </Tab>
            );
        });

        allTabs.push(
            <Tab key={'addTab'} eventKey={'addTab'} title={'+'} onClick={handleAddTab} >
            </Tab>
        )

        const content =
            <Tabs id="reconciliation-tabs"
                activeKey={key}
                onSelect={handleSelectTab}
                defaultActiveKey={tabs[0].id}
                className="mb-3"
                onDoubleClick={() => handleDoubleClick(key)}
            >
                {allTabs}
            </Tabs>

        return content;
    };

    function handleSelectTab(key) {
        if (key === 'addTab') {
            handleAddTab();
        } else {
            setKey(key)
        }
    };

    function handleAddTab() {
        const newTabObject = {
            id: uuidv4(),
            name: `Tab ${tabs.length + 1}`,
            content: <ArtsdataReconciliationApp />
        };
        setTabs([...tabs, newTabObject]);
        setKey(newTabObject.id);
    };

    return (
        <div className="container">
            <div>
                {createTabs()}
            </div>
        </div>
    );
}

export { TabComponent }
