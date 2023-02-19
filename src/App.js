import './App.css';
import ArchivedGoals from './components/ArchivedGoals/ArchivedGoals';
import GoalsList from './components/GoalsList/GoalsList';
import UserInput from './components/UserInputs/UserInput';

function App() {
  return (
    <div>
      <section id="input">
        <UserInput />
      </section>
      <section id="goals">
        <GoalsList />
      </section>
      <section id="archive">
        <ArchivedGoals />
      </section>
    </div>
  );
}

export default App;
