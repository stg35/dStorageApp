import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export interface IMessage {
    name: string;
    content: string;
    format: string;
}

export const BasicForm = ((): JSX.Element => {
    const [fileName, setFileName] = useState<string>('');
    const [fileContent, setFileContent] = useState<string>('');
    const [fileFormat, setFileFormat] = useState<string>('');

    const [message, setMessage] = useState<IMessage>();

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        console.log(fileName, fileContent, fileFormat);

        setMessage({
            name: fileName,
            content: fileContent,
            format: fileFormat
        });
    }

    useEffect(() => console.log(message), [message]);

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="fileName">Название файла</Form.Label>
                <Form.Control
                    id="fileName"
                    name="fileName"
                    type="text"
                    placeholder="Введите название файла"
                    onChange={event => setFileName(event.target.value)}
                    value={fileName}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Содержимое файла</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    onChange={event => setFileContent(event.target.value)}
                    value={fileContent}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select 
                    aria-label="File format select"
                    onChange={event => setFileFormat(event.target.value)}
                >
                    <option>Выберите формат</option>
                    <option value="txt">txt</option>
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
                submit
            </Button>
        </Form>
    )
});