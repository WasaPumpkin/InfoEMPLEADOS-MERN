//components/TaskItem.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, completeTask } from '../features/tasks/taskSlice';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import PropTypes from 'prop-types'; // Import PropTypes

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (document.getElementById('app')) {
      Modal.setAppElement('#app');
    }
  }, []);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      toast.success('Task successfully deleted!');
    } catch {
      toast.error('Error deleting task');
    }
    setShowDeleteModal(false);
  };

  const submitCompletion = () => {
    dispatch(completeTask({ taskId: task._id, completionMessage }));
    setShowCompletionModal(false);
    setCompletionMessage('');
  };

  return (
    <li className="task-list__item">
      <div className="task-list__content">
        <p className="task-list__text">{task.text}</p>
        <p className="task-list__status">
          Status: {task.status}
          {task.status === 'completed' && task.completedAt && (
            <span className="task-list__date">
              - Completed on {new Date(task.completedAt).toLocaleDateString()}
            </span>
          )}
        </p>
        {task.status === 'completed' && task.completionMessage && (
          <p className="task-list__completion-message">
            Completion Note: {task.completionMessage}
          </p>
        )}
      </div>
      <div className="task-list__actions">
        {userInfo?.role === 'employee' && task.status !== 'completed' && (
          <button
            className="task-list__btn"
            onClick={() => setShowCompletionModal(true)}
          >
            Mark as Complete
          </button>
        )}
        {userInfo?.role === 'admin' && (
          <>
            <button
              className="task-list__btn task-list__btn--delete"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
            <Modal
              isOpen={showDeleteModal}
              onRequestClose={() => setShowDeleteModal(false)}
              contentLabel="Confirm Delete"
              className="modal"
              overlayClassName="modal-overlay"
            >
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this task?</p>
              <div className="modal__actions">
                <button
                  onClick={handleDelete}
                  className="modal__btn modal__btn--confirm"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="modal__btn modal__btn--cancel"
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </>
        )}
      </div>

      {/* Completion Modal for Employee */}
      <Modal
        isOpen={showCompletionModal}
        onRequestClose={() => setShowCompletionModal(false)}
        contentLabel="Complete Task"
        className="completion-modal"
        overlayClassName="completion-modal-overlay"
      >
        <div className="completion-modal__header">Complete Task</div>
        <div className="completion-modal__body">
          <input
            type="text"
            className="completion-modal__input"
            placeholder="Briefly describe what you did"
            value={completionMessage}
            onChange={(e) => setCompletionMessage(e.target.value)}
            aria-label="Completion message"
          />
        </div>
        <div className="completion-modal__actions">
          <button
            onClick={submitCompletion}
            className="completion-modal__btn completion-modal__btn--confirm"
          >
            Submit Completion
          </button>
          <button
            onClick={() => setShowCompletionModal(false)}
            className="completion-modal__btn completion-modal__btn--cancel"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </li>
  );
};

// Add PropTypes validation
TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    completedAt: PropTypes.string,
    completionMessage: PropTypes.string,
  }).isRequired,
};

export default TaskItem;