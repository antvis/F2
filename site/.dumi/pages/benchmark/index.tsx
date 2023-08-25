import React from 'react';
import './index.less';
import result from './result.json';

export default () => {
  return (
    <div className="main">
      {result.map(({ title, tableHead, ...tableRows }) => {
        return (
          <div>
            <h2>{title}</h2>
            <table>
              <thead>
                <tr>
                  <th>机型+版本</th>
                  {tableHead.map((item) => (
                    <th key={item}>{item}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Object.entries(tableRows).map(([key, value]) => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      {value.map((item, index) => {
                        return <td key={index}>{item}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
