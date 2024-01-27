import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExpressionForm = () => {
  const [combinator, setCombinator] = useState('and');
  const [expressions, setExpressions] = useState([
    { ruleType: 'age', output: { operator: '>=', value: '', score: '' } },
  ]);
  const [jsonData, setJsonData] = useState('');

  const updateDisplayData = () => {
    const data = {
      rules: expressions.map(({ ruleType, output }) => ({
        key: ruleType,
        output: {
          value: parseFloat(output.value),
          operator: output.operator,
          score: parseInt(output.score, 10),
        },
      })),
      combinator: combinator.toLowerCase(),
    };

    const jsonString = JSON.stringify(data, null, 2);
    setJsonData(jsonString);
    console.log(jsonString);
  };

  const addExpression = () => {
    setExpressions([...expressions, { ruleType: 'age', output: { operator: '>=', value: '', score: '' } }]);
    updateDisplayData();
  };

  const deleteExpression = (index) => {
    const updatedExpressions = [...expressions];
    updatedExpressions.splice(index, 1);
    setExpressions(updatedExpressions);
    updateDisplayData();
  };

  const handleChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index].output[field] = value;
    setExpressions(updatedExpressions);
    updateDisplayData();
  };

  const handleCombinatorChange = (value) => {
    setCombinator(value);
    updateDisplayData();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="combinator" className="d-block mb-2">Connector Type:</label>
          <select
            id="combinator"
            className="form-select mb-3"
            onChange={(e) => handleCombinatorChange(e.target.value)}
            value={combinator}
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>
        </div>

        {expressions.map((expression, index) => (
          <div key={index} className="col-md-12 mb-3">
            <div className="mb-3 d-flex">
              <div className="flex-grow-1">
                <label className="d-block">Rule Type:</label>
                <select
                  className="form-select mb-2"
                  onChange={(e) => handleChange(index, 'ruleType', e.target.value)}
                  value={expression.ruleType}
                >
                  <option value="age">Age</option>
                  <option value="creditScore">Credit Score</option>
                  <option value="accountBalance">Account Balance</option>
                </select>
              </div>

              <div className="flex-grow-1 ms-3">
                <label className="d-block">Operator:</label>
                <select
                  className="form-select mb-2"
                  onChange={(e) => handleChange(index, 'operator', e.target.value)}
                  value={expression.output.operator}
                >
                  <option value=">">{'>'}</option>
                  <option value="<">{'<'}</option>
                  <option value=">=">{'>='}</option>
                  <option value="<=">{'<='}</option>
                  <option value="=">{'='}</option>
                </select>
              </div>

              <div className="flex-grow-1 ms-3">
                <label className="d-block">Value:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                  value={expression.output.value}
                />
              </div>

              <div className="flex-grow-1 ms-3">
                <label className="d-block">Score:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  onChange={(e) => handleChange(index, 'score', e.target.value)}
                  value={expression.output.score}
                />
              </div>

              <div className="ms-3">
                <button className="btn btn-danger" onClick={() => deleteExpression(index)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="col-md-12 mb-3">
          <button className="btn btn-primary" onClick={addExpression}>
            Add Expression
          </button>
        </div>

        <div className="col-md-12 mb-3">
          <label className="d-block">Display Output:</label>
          <pre>{jsonData}</pre>
        </div>
      </div>
    </div>
  );
};

export default ExpressionForm;
