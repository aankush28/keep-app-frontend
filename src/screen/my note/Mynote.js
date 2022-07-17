
import React, { useEffect } from 'react'
import { Card, Button, Badge } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { Link, useNavigate } from "react-router-dom";
import MainScreen from '../../components/header/mainScreen'
import '../my note/screen.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from '../../redux/action/notesAction';
import Loading from '../../components/Loding';
import ErrorMessage from '../../components/ErrorMessage';
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <span style={{
      color: "black",
      textDecoration: "none",
      flex: 1,
      cursor: "pointer",
      alignSelf: "center",
      fontSize: 18,

    }}
      onClick={decoratedOnClick}
    >
      {children}
    </span>
    /*  <button
       type="button"
       style={{ backgroundColor: 'pink' }}
       onClick={decoratedOnClick}
     >
       {children}
     </button> */
  );
}
export default function Mynote({ search,history }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

   useEffect(() => 
   { dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
   }, [history,noteDelete])




console.log(notes);

/* useEffect(() => {

}, [history]) */
const deleteHandler = (id) => {

  if (window.confirm("Are you sure?")) {
    dispatch(deleteNoteAction(id))
  }
};
return (
  <MainScreen title={`Welcome back ${userInfo && userInfo.name}...`} size='lg' >
    <Link to={"/createnote"}>
      <Button style={{ marginLeft: 10, marginBottom: 6 }}>
        Create new note
      </Button>
    </Link>
    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
        {loadingDelete && <Loading />}
    {
      notes?.reverse().filter((filteredNote) =>
      filteredNote.title.toLowerCase().includes(search.toLowerCase())
    ).map((note) => (
        <Accordion defaultActiveKey="0" key={note._id}>

          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>

              <span style={{
                color: "black",
                textDecoration: "none",
                flex: 1,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 18,
              }} ><CustomToggle eventKey="0">{note.title}</CustomToggle>
              </span>

              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="success">
                    Category - {note.category}
                  </Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>
                    {note.content}
                  </p>
                     <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>


      ))
    }



  </MainScreen>
);
}
