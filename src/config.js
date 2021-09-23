import ForgeUI, {
  render,
  AdminPage,
  Fragment,
  Form,
  Toggle,
  useState,
  useEffect,
} from '@forge/ui';


import { storage } from '@forge/api';


const STORAGE_KEY = "config-toggle-value";
const DEFAULT_VALUE = { "config-toggle": false };

const App = () => {
  const [projectConfigState, setProjectConfigState] = useState(undefined);

  useEffect(async () => {
    const storageData = await storage.get(STORAGE_KEY);
    console.log("Data loaded with Storage API", storageData)
    setProjectConfigState(storageData || DEFAULT_VALUE);
  }, []);


  const onProjectConfigSubmit = async (toggleConfig) => {
    console.log("Data stored with Storage API", toggleConfig)
    await storage.set(STORAGE_KEY, toggleConfig);
    setProjectConfigState(toggleConfig);
  };

  const isToggleConfigSelected = (name) => projectConfigState && projectConfigState[name] && { defaultChecked: true }


  const renderAssigneeConfig = () => (
      <Toggle {...isToggleConfigSelected('config-toggle')} label="Show/hide Toggle" name="config-toggle"/>
  )


  return (
      <Fragment>
        <Form onSubmit={onProjectConfigSubmit}>
          {renderAssigneeConfig()}
        </Form>
      </Fragment>
  );
};

export const run = render(
    <AdminPage>
      <App />
    </AdminPage>
);