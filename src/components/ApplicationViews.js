import React from "react"
import { Route, Router } from "react-router-dom"
import { CropProvider } from "./crops/CropProvider"
import { CropList } from "./crops/CropList"
import { CropForm } from "./crops/CropForm"
import { CropDetails } from "./crops/CropDetail"
import { CropSearch } from "./crops/CropSearch"
import { ScheduledPlantingsProvider } from "./schedule/ScheduleProvider"
import { SeedScheduleForm } from "./schedule/ScheduleForm"
import { LatLonProvider } from "./externals/GraphHopperProvider"
import { UserProvider } from "./users/UserDataProvider"
import { FrostDatesProvider } from "./externals/FrostDateProvider"
import { FrostDateTable } from "./schedule/FrostDateTable"
import { LogProvider } from "./log/LogProvider"
import { LogForm } from "./log/LogForm"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route path="/home">
                </Route>
            <CropProvider>
                <LogProvider>
                    <Route exact path="/log" render={
                        props => <LogForm {...props}/>
                    }/>
                </LogProvider>
            </CropProvider>
            <ScheduledPlantingsProvider>
                <CropProvider>
                    <LatLonProvider>
                        <FrostDatesProvider> 
                            <UserProvider>
                                <Route exact path="/schedule" render={
                                    props => <><SeedScheduleForm {...props}/>
                                    <FrostDateTable/>
                                    </>
                                }/>
                            </UserProvider>
                        </FrostDatesProvider>
                    </LatLonProvider>
                </CropProvider>
            </ScheduledPlantingsProvider>
            <CropProvider>
                <Route exact path="/crops" render={
                    props => <>
                        <CropSearch/>
                        <CropList {...props}/>
                    </>
                }/>
                <Route path="/crops/create" render={
                    props => <CropForm {...props}/>
                }/>
                <Route path="/crops/:cropId(\d+)" render={
                    props => <CropDetails {...props} />
                }/>
                <Route path="/crops/edit/:cropId(\d+)" render={
                        props => <CropForm {...props} />
                } />
            </CropProvider>
        </>
    )
}