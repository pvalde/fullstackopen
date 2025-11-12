const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Total = ({ parts }) => {
  const total = parts.reduce(
    (acumulator, part) => part.exercises + acumulator,
    0,
  );
  return (
    <p>
      <strong>Total of exercises {total}</strong>
    </p>
  );
};

export default Course;
