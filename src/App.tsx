import './App.css';
import { AnalysisValues } from './components/AnalysisValues';
import { Header } from './components/Header';
import { ProcessBar } from './components/ProcessBar';
import { DistrictMap } from './components/Map';
import { useState } from 'react';
import { ConfigurationData, DistrictingData, MapData } from './types';

function App() {

  const [mapData, setMapData] = useState<MapData>()
  const [configurationData, setConfigurationData] = useState<ConfigurationData>()
  const [districtingData, setDistrictingData] = useState<DistrictingData>()

  function onUploadDone(data: MapData) {
    setMapData(data);
    setDistrictingData(undefined)
  }

  function onConfigurationDone(data: ConfigurationData) {
    setConfigurationData(data);
    setDistrictingData(undefined)
  }

  function onGeneratingDone(data: DistrictingData) {
    setDistrictingData(data);
  }

  return <>
    <Header />
    <div className='flex'>
      <ProcessBar onUploadDone={onUploadDone} onConfigurationDone={onConfigurationDone} onGeneratingDone={onGeneratingDone} mapData={mapData} configurationData={configurationData} districtingData={districtingData} />
      <DistrictMap mapData={mapData} districtingData={districtingData} />
      <AnalysisValues />
    </div>
  </>
}

export default App;
