import ArchivedGoals from './components/ArchivedGoals/ArchivedGoals';
import GoalsList from './components/GoalsList/GoalsList';
import UserInput from './components/UserInputs/UserInput';
import styles from './App.module.css';

const DUMMY_GOALS = [
  {
    id: 1,
    title: 'Complete 10 lectures from the course',
    time: new Date('March 10, 2023 13:00:00').getTime(),
  },
  {
    id: 2,
    title: 'Write LinkedIn post',
    time: new Date('March 15, 2023 15:00:00').getTime(),
  },
];

function App() {
  return (
    <div>
      <UserInput />
      <GoalsList goals={DUMMY_GOALS} />
      <ArchivedGoals />
    </div>
  );
}

export default App;
