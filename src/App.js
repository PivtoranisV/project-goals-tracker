import ArchivedGoals from './components/ArchivedGoals/ArchivedGoals';
import GoalsList from './components/GoalsList/GoalsList';
import UserInput from './components/UserInputs/UserInput';
import styles from './App.module.css';

const DUMMY_GOALS = [
  { id: 1, title: 'Complete 10 lectures from the course', time: 24 },
  { id: 2, title: 'Write LinkedIn post', time: 12 },
];

function App() {
  return (
    <div>
      <section id={styles.input}>
        <UserInput />
      </section>
      <section id={styles.goals}>
        <GoalsList goals={DUMMY_GOALS} />
      </section>
      <section id={styles.archive}>
        <ArchivedGoals />
      </section>
    </div>
  );
}

export default App;
