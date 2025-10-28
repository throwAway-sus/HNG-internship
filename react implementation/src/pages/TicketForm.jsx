import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FormRow, Label, Input, Textarea, Select, PrimaryButton, NavButton } from "../styles/styledBits";

const ErrorMessage = styled.div`
  color: #dc2626;
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 14px;
`;

export const TicketForm = ({ initial = null, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initial ? initial.title : "");
  const [description, setDescription] = useState(initial ? initial.description : "");
  const [status, setStatus] = useState(initial ? initial.status : "open");
  const [priority, setPriority] = useState(initial ? initial.priority : "medium");
  const [errors, setErrors] = useState({});
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setStatus(initial.status || "open");
      setPriority(initial.priority || "medium");
    }
    setTimeout(() => {
      firstFieldRef.current && firstFieldRef.current.focus();
    }, 10);
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";
    if (!["open", "in_progress", "closed"].includes(status)) e.status = "Invalid status";
    if (description && description.length > 1000) e.description = "Description is too long";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
    });
    if (!initial) {
      setTitle("");
      setDescription("");
      setStatus("open");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormRow>
        <Label>Title *</Label>
        <Input
          ref={firstFieldRef}
          aria-required="true"
          aria-invalid={!!errors.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <Label>Description *</Label>
        <Textarea
          rows={4}
          value={description}
          aria-required="true"
          aria-invalid={!!errors.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <Label>Status</Label>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </Select>
        {errors.status && <ErrorMessage>{errors.status}</ErrorMessage>}
      </FormRow>

      <FormRow>
        <Label>Priority</Label>
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </FormRow>

      <ButtonContainer>
        <PrimaryButton type="submit">{initial ? "Update Ticket" : "Create Ticket"}</PrimaryButton>
        <NavButton type="button" onClick={() => onCancel && onCancel()}>Cancel</NavButton>
      </ButtonContainer>
    </form>
  );
};