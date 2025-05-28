import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const ColumnContainer = styled.div`
  width: 300px;
  min-height: 100px;
  overflow-y: scroll;
  display: flex;
  scrollbar-width: none;
  background-color: #f0f0f0;
  border-radius: 3px;
  padding: 16px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export default function Column() {
  return (
    <div>Column</div>
  )
}
