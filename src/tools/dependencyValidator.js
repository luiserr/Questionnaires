import {MATRIX, MULTIPLE, NUMERIC} from "../const/questionTypes";

export function hasDependency(sections, question = {}, dependencies = []) {
  const dependency = searchDependency(question.id, dependencies);
  if (dependency) {
    const {
      dependsOperator: operator,
      dependsOfQuestion: questionId,
      dependsOfSection: sectionId,
      questionType,
      parentId,
      answerId
    } = dependency;
    const tryUser = searchAttempt(sections, sectionId, questionId, questionType, parentId);
    if (tryUser) {
      const {attempt, answers} = tryUser;
      if (questionType !== MULTIPLE) {
        const questionValue = getDependencyAnswer(questionType, answers, attempt);
        const dependencyValue = getDependencyAnswer(questionType, answers, answerId);
        if (dependencyValue && questionValue) {
          return compareAnswer(questionValue, operator, dependencyValue);
        }
      } else {
        return compareAnswerFromMultiple(attempt, answerId)
      }
    }
    return false;
  }
  return true;
}

function searchDependency(questionId, dependencies = []) {
  return dependencies.find(dependency => parseInt(dependency.questionId) === parseInt(questionId));
}

function searchAttempt(sections = [], sectionId, questionId, dependencyType, parentId) {
  const section = sections.find(item => item.id === sectionId);
  if (section) {
    let question = null;
    switch (dependencyType) {
      case MATRIX:
        question = section.questions?.find(item => item.id === parentId);
        if (question) {
          const subQuestion = question.answers?.find((item) => questionId === item.id);
          const attempt = question.attempts?.answers.find((item) => questionId === item.questionId)
          return {
            attempt: attempt?.answerId ?? null,
            answers: subQuestion?.answers ?? []
          }
        }
        break;
      case MULTIPLE:
        question = section.questions?.find(item => item.id === questionId);
        if (question) {
          return {
            attempt: question?.attempts?.answers ?? null,
            answers: question?.answers ?? []
          };
        }
        break;
      default:
        question = section.questions?.find(item => item.id === questionId);
        if (question) {
          return {
            attempt: question?.attempts?.answers[0] ?? null,
            answers: question?.answers ?? []
          };
        }
    }
  }
  return false;
}

function getDependencyAnswer(type, answers = [], id) {
  const currentAnswer = answers.find(answer => answer.id === id)
  if (currentAnswer) {
    switch (type) {
      case NUMERIC:
        return currentAnswer['value'];
      default:
        return currentAnswer['id']
    }
  }
  return false;
}


/**
 *
 * @param attempts <array>
 * @param answerId
 */
function compareAnswerFromMultiple(attempts = [], answerId) {
  return attempts.includes(answerId);
}

function compareAnswer(valueAnswer, operator, valueDependency) {
  switch (operator) {
    case '=':
      return valueAnswer == valueDependency;
    case '>':
      return valueAnswer > valueDependency;
    case '>=':
      return valueAnswer >= valueDependency;
    case '<':
      return valueAnswer < valueDependency;
    case '<=':
      return valueAnswer <= valueDependency;
    default:
      return false;
  }
}